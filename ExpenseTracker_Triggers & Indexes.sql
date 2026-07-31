CREATE INDEX idx_expense_category_name
ON expense_categories(category_name);
CREATE INDEX idx_income_user
ON incomes(user_id);

CREATE INDEX idx_income_date
ON incomes(income_date);

CREATE INDEX idx_income_user_date
ON incomes(user_id,income_date);

CREATE INDEX idx_expense_user
ON expenses(user_id);

CREATE INDEX idx_expense_category
ON expenses(category_id);

CREATE INDEX idx_expense_date
ON expenses(expense_date);

CREATE INDEX idx_expense_user_date
ON expenses(user_id,expense_date);

CREATE INDEX idx_expense_user_category
ON expenses(user_id,category_id);

CREATE INDEX idx_budget_user
ON budgets(user_id);

CREATE INDEX idx_budget_category
ON budgets(category_id);

CREATE INDEX idx_budget_month_year
ON budgets(budget_month,budget_year);

CREATE INDEX idx_expense_audit_expense
ON expense_audit_logs(expense_id);

CREATE INDEX idx_expense_audit_user
ON expense_audit_logs(user_id);

CREATE INDEX idx_expense_audit_action
ON expense_audit_logs(action);

CREATE INDEX idx_expense_audit_date
ON expense_audit_logs(performed_at);



----------------Triggers &functions---------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trg_income_updated_at
BEFORE UPDATE
ON incomes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_expense_updated_at
BEFORE UPDATE
ON expenses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_budget_updated_at
BEFORE UPDATE
ON budgets
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();




CREATE OR REPLACE FUNCTION log_expense_audit()
RETURNS TRIGGER
AS $$
BEGIN

    IF TG_OP = 'INSERT' THEN

        INSERT INTO expense_audit_logs
        (
            expense_id,
            user_id,
            action,
            new_data
        )
        VALUES
        (
            NEW.expense_id,
            NEW.user_id,
            'INSERT',
            to_jsonb(NEW)
        );

        RETURN NEW;

    ELSIF TG_OP = 'UPDATE' THEN

        INSERT INTO expense_audit_logs
        (
            expense_id,
            user_id,
            action,
            old_data,
            new_data
        )
        VALUES
        (
            NEW.expense_id,
            NEW.user_id,
            'UPDATE',
            to_jsonb(OLD),
            to_jsonb(NEW)
        );

        RETURN NEW;

    ELSIF TG_OP = 'DELETE' THEN

        INSERT INTO expense_audit_logs
        (
            expense_id,
            user_id,
            action,
            old_data
        )
        VALUES
        (
            OLD.expense_id,
            OLD.user_id,
            'DELETE',
            to_jsonb(OLD)
        );

        RETURN OLD;

    END IF;

    RETURN NULL;

END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trg_expense_audit
AFTER INSERT OR UPDATE OR DELETE
ON expenses
FOR EACH ROW
EXECUTE FUNCTION log_expense_audit();


