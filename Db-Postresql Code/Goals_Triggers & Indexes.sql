-------Triggers------
CREATE INDEX idx_goal_user
ON goals(user_id);

CREATE INDEX idx_goal_status
ON goals(status_id);

CREATE INDEX idx_goal_investment
ON goals(investment_type_id);

CREATE INDEX idx_goal_user_status
ON goals(user_id, status_id);

CREATE INDEX idx_progress_goal
ON goal_progress(goal_id);

CREATE INDEX idx_goal_audit_goal
ON goal_audit_logs(goal_id);

CREATE INDEX idx_goal_audit_user
ON goal_audit_logs(user_id);


---------Trigger 1 – Update updated_at
CREATE OR REPLACE FUNCTION fn_update_goal_timestamp()
RETURNS TRIGGER
AS
$$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trg_goal_timestamp

BEFORE UPDATE
ON goals

FOR EACH ROW

EXECUTE FUNCTION fn_update_goal_timestamp();


------------Trigger 2 – Audit Goal Creation
CREATE OR REPLACE FUNCTION fn_goal_created()
RETURNS TRIGGER
AS
$$
BEGIN

INSERT INTO goal_audit_logs
(
goal_id,
user_id,
action,
description
)
VALUES
(
NEW.goal_id,
NEW.user_id,
'GOAL_CREATED',
'Goal created'
);

RETURN NEW;

END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trg_goal_created

AFTER INSERT
ON goals

FOR EACH ROW

EXECUTE FUNCTION fn_goal_created();

--------------Trigger 3 – Audit Goal Update
CREATE OR REPLACE FUNCTION fn_goal_updated()
RETURNS TRIGGER
AS
$$
BEGIN

INSERT INTO goal_audit_logs
(
goal_id,
user_id,
action,
description
)
VALUES
(
NEW.goal_id,
NEW.user_id,
'GOAL_UPDATED',
'Goal updated'
);

RETURN NEW;

END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER trg_goal_updated

AFTER UPDATE
ON goals

FOR EACH ROW

EXECUTE FUNCTION fn_goal_updated();


----------Trigger 4 – Soft Delete Audit
CREATE OR REPLACE FUNCTION fn_goal_soft_delete()
RETURNS TRIGGER
AS
$$
BEGIN

IF NEW.is_deleted = TRUE
AND OLD.is_deleted = FALSE THEN

INSERT INTO goal_audit_logs
(
goal_id,
user_id,
action,
description
)
VALUES
(
NEW.goal_id,
NEW.user_id,
'GOAL_DELETED',
'Goal soft deleted'
);

NEW.deleted_at := CURRENT_TIMESTAMP;

END IF;

RETURN NEW;

END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER trg_goal_soft_delete

BEFORE UPDATE
ON goals

FOR EACH ROW

EXECUTE FUNCTION fn_goal_soft_delete();


----------Trigger 5 – Update Current Quantity
CREATE OR REPLACE FUNCTION fn_update_goal_progress()
RETURNS TRIGGER
AS
$$
BEGIN

UPDATE goals

SET current_quantity = current_quantity + NEW.quantity_added

WHERE goal_id = NEW.goal_id;

RETURN NEW;

END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER trg_goal_progress

AFTER INSERT
ON goal_progress

FOR EACH ROW

EXECUTE FUNCTION fn_update_goal_progress();

---------------Trigger 6 – Audit Progress Update
CREATE OR REPLACE FUNCTION fn_progress_audit()
RETURNS TRIGGER
AS
$$
DECLARE
v_user_id BIGINT;
BEGIN

SELECT user_id
INTO v_user_id
FROM goals
WHERE goal_id = NEW.goal_id;

INSERT INTO goal_audit_logs
(
goal_id,
user_id,
action,
description
)
VALUES
(
NEW.goal_id,
v_user_id,
'PROGRESS_UPDATED',
'Goal progress updated'
);

RETURN NEW;

END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER trg_progress_audit

AFTER INSERT
ON goal_progress

FOR EACH ROW

EXECUTE FUNCTION fn_progress_audit();


-----------Trigger 7 – Auto Complete Goal
CREATE OR REPLACE FUNCTION fn_complete_goal()
RETURNS TRIGGER
AS
$$
DECLARE
v_completed_status SMALLINT;
BEGIN

SELECT status_id
INTO v_completed_status
FROM goal_statuses
WHERE status_name = 'COMPLETED';

IF NEW.current_quantity >= NEW.target_quantity
AND OLD.current_quantity < OLD.target_quantity THEN

NEW.status_id := v_completed_status;
NEW.completed_at := CURRENT_TIMESTAMP;

END IF;

RETURN NEW;

END;
$$
LANGUAGE plpgsql;


CREATE TRIGGER trg_goal_complete

BEFORE UPDATE
ON goals

FOR EACH ROW

EXECUTE FUNCTION fn_complete_goal();

