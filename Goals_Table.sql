---------------investment_types----------
CREATE TABLE investment_types (
    investment_type_id BIGSERIAL PRIMARY KEY,
    investment_name VARCHAR(50) NOT NULL UNIQUE,
    default_unit VARCHAR(20) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-------------goal_statuses-----------------
CREATE TABLE goal_statuses (
    status_id SMALLSERIAL PRIMARY KEY,
    status_name VARCHAR(30) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

------------goals------------------
CREATE TABLE goals (

    goal_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    investment_type_id BIGINT NOT NULL,

    status_id SMALLINT NOT NULL DEFAULT 1,

    goal_name VARCHAR(150) NOT NULL,

    notes TEXT,

    target_quantity NUMERIC(12,2) NOT NULL
        CHECK(target_quantity > 0),

    current_quantity NUMERIC(12,2)
        DEFAULT 0
        CHECK(current_quantity >= 0),

    unit VARCHAR(20) NOT NULL,

    start_date DATE NOT NULL,

    end_date DATE NOT NULL,

    completed_at TIMESTAMPTZ,

    is_deleted BOOLEAN DEFAULT FALSE,

    deleted_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_goal_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_goal_investment
        FOREIGN KEY(investment_type_id)
        REFERENCES investment_types(investment_type_id),

    CONSTRAINT fk_goal_status
        FOREIGN KEY(status_id)
        REFERENCES goal_statuses(status_id),

    CONSTRAINT chk_goal_dates
        CHECK(end_date >= start_date)
);


-------------goal_progress-----------------
CREATE TABLE goal_progress (

    progress_id BIGSERIAL PRIMARY KEY,

    goal_id BIGINT NOT NULL,

    quantity_added NUMERIC(12,2)
        NOT NULL
        CHECK(quantity_added > 0),

    progress_date DATE DEFAULT CURRENT_DATE,

    remarks TEXT,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_progress_goal
        FOREIGN KEY(goal_id)
        REFERENCES goals(goal_id)
        ON DELETE CASCADE
);


-------------goal_audit_logs-----------------
CREATE TABLE goal_audit_logs (

    audit_id BIGSERIAL PRIMARY KEY,

    goal_id BIGINT,

    user_id BIGINT NOT NULL,

    action VARCHAR(50) NOT NULL,

    description TEXT,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_goal_audit_goal
        FOREIGN KEY(goal_id)
        REFERENCES goals(goal_id)
        ON DELETE SET NULL,

    CONSTRAINT fk_goal_audit_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);