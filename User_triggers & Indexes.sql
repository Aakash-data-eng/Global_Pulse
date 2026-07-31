-----User updates trigger to audit log-----
CREATE OR REPLACE FUNCTION users_audit_trigger()
RETURNS TRIGGER AS
$$
BEGIN

    -- INSERT
    IF TG_OP = 'INSERT' THEN

        INSERT INTO audit_logs
        (
            user_id,
            table_name,
            action,
            description
        )
        VALUES
        (
            NEW.user_id,
            'users',
            'USER_CREATED',
            'New user account created'
        );

        RETURN NEW;

    END IF;

    -- UPDATE
    IF TG_OP = 'UPDATE' THEN

        INSERT INTO audit_logs
        (
            user_id,
            table_name,
            action,
            description
        )
        VALUES
        (
            NEW.user_id,
            'users',
            'USER_UPDATED',
            'User profile updated'
        );

        RETURN NEW;

    END IF;

    -- DELETE
    IF TG_OP = 'DELETE' THEN

        INSERT INTO audit_logs
        (
            user_id,
            table_name,
            action,
            description
        )
        VALUES
        (
            OLD.user_id,
            'users',
            'USER_DELETED',
            'User account deleted'
        );

        RETURN OLD;

    END IF;

END;
$$
LANGUAGE plpgsql;

---Triggering it---
CREATE TRIGGER trg_users_audit
AFTER INSERT OR UPDATE OR DELETE
ON users
FOR EACH ROW
EXECUTE FUNCTION users_audit_trigger();




---index for fast retrieval---

-- Users
CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_users_mobile
ON users(mobile_number);

CREATE INDEX idx_users_username
ON users(username);

-- OTP
CREATE INDEX idx_otp_user
ON otp_verifications(user_id);

CREATE INDEX idx_otp_mobile
ON otp_verifications(mobile_number);

-- Sessions
CREATE INDEX idx_sessions_user
ON user_sessions(user_id);

CREATE INDEX idx_sessions_active
ON user_sessions(is_active);

-- Social Login
CREATE INDEX idx_social_user
ON social_logins(user_id);

-- Audit
CREATE INDEX idx_audit_user
ON audit_logs(user_id);

CREATE INDEX idx_audit_created
ON audit_logs(created_at);



--latest update to trigger updated at--
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trg_update_users_updated_at
BEFORE UPDATE
ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

