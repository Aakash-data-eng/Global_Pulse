------------------expense_categories----------
CREATE TABLE expense_categories (
    category_id BIGSERIAL PRIMARY KEY,

    category_name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    icon_name VARCHAR(100),

    color_code VARCHAR(20),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-------------incomes---------------

CREATE TABLE incomes (

    income_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    amount NUMERIC(12,2) NOT NULL
        CHECK(amount > 0),

    income_date DATE NOT NULL,

    payment_method VARCHAR(30)
        CHECK(payment_method IN
        ('Cash',
         'UPI',
         'Credit Card',
         'Debit Card',
         'Net Banking',
         'Cheque',
         'Wallet')),

    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_income_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
);


-------------expenses---------------

CREATE TABLE expenses (

    expense_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    category_id BIGINT NOT NULL,

    amount NUMERIC(12,2) NOT NULL
        CHECK(amount > 0),

    expense_date DATE NOT NULL,

    payment_method VARCHAR(30)
        CHECK(payment_method IN
        ('Cash',
         'UPI',
         'Credit Card',
         'Debit Card',
         'Net Banking',
         'Cheque',
         'Wallet')),

    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_expense_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id),

    CONSTRAINT fk_expense_category
        FOREIGN KEY(category_id)
        REFERENCES expense_categories(category_id)
);


------------budgets--------------
CREATE TABLE budgets (

    budget_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    category_id BIGINT NOT NULL,

    budget_amount NUMERIC(12,2) NOT NULL
        CHECK(budget_amount > 0),

    budget_month SMALLINT NOT NULL
        CHECK(budget_month BETWEEN 1 AND 12),

    budget_year SMALLINT NOT NULL,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_budget_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id),

    CONSTRAINT fk_budget_category
        FOREIGN KEY(category_id)
        REFERENCES expense_categories(category_id),

    CONSTRAINT uq_budget
        UNIQUE(
            user_id,
            category_id,
            budget_month,
            budget_year
        )
);


--------------expense_audit_logs------------------------------
CREATE TABLE expense_audit_logs (

    audit_id BIGSERIAL PRIMARY KEY,

    expense_id BIGINT NOT NULL,

    user_id BIGINT NOT NULL,

    action VARCHAR(20) NOT NULL
        CHECK(action IN ('INSERT','UPDATE','DELETE')),

    old_data JSONB,

    new_data JSONB,

    performed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_expense
        FOREIGN KEY(expense_id)
        REFERENCES expenses(expense_id),

    CONSTRAINT fk_audit_user
        FOREIGN KEY(user_id)
        REFERENCES users(user_id)
);



