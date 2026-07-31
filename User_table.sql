------------------------User table------------------------
CREATE TABLE users (
    user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    username VARCHAR(100) NOT NULL UNIQUE,

    email VARCHAR(255) NOT NULL UNIQUE,

    mobile_number VARCHAR(15) UNIQUE,

    password_hash TEXT,

    auth_provider VARCHAR(20) NOT NULL
        DEFAULT 'LOCAL'
        CHECK (auth_provider IN ('LOCAL', 'GOOGLE')),

    is_mobile_verified BOOLEAN NOT NULL DEFAULT FALSE,

    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,

    profile_image TEXT,

    account_status VARCHAR(20) NOT NULL
        DEFAULT 'ACTIVE'
        CHECK (account_status IN ('ACTIVE', 'INACTIVE')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);


------------------------otp_verifications table------------------------
CREATE TABLE otp_verifications (
    otp_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT NOT NULL,

    mobile_number VARCHAR(15) NOT NULL,

    otp_code CHAR(6) NOT NULL,

    expires_at TIMESTAMPTZ NOT NULL,

    is_used BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_otp_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);



------------------------social_logins table------------------------
CREATE TABLE social_logins (
    social_login_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT NOT NULL,

    provider VARCHAR(20) NOT NULL
        CHECK (provider IN ('GOOGLE')),

    provider_user_id VARCHAR(255) NOT NULL,

    email VARCHAR(255) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_social_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT uq_provider_user
        UNIQUE(provider, provider_user_id)
);




------------------------user_sessions table------------------------
CREATE TABLE user_sessions (
    session_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    user_id BIGINT NOT NULL,

    access_token TEXT NOT NULL,

    refresh_token TEXT,

    login_time TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    logout_time TIMESTAMPTZ,

    ip_address INET,

    device_name VARCHAR(255),

    browser VARCHAR(255),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_session_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);



------------------------audit_logs table------------------------
CREATE TABLE audit_logs (
    audit_id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    table_name VARCHAR(100) NOT NULL,

    action VARCHAR(100) NOT NULL,

    description TEXT,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_audit_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);

