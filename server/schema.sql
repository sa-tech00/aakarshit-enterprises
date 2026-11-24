CREATE TABLE IF NOT EXISTS admins (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS enquiries (
  id             SERIAL PRIMARY KEY,
  name           TEXT NOT NULL,
  company        TEXT,
  mobile         TEXT NOT NULL,
  service        TEXT,
  message        TEXT NOT NULL,
  status         TEXT NOT NULL DEFAULT 'new'
                 CHECK (status IN ('new', 'contacted', 'in_progress', 'closed')),
  admin_response TEXT,
  email_sent     BOOLEAN NOT NULL DEFAULT false,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status);

CREATE TABLE IF NOT EXISTS gallery (
  id         SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  category   TEXT,
  filename   TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS feedback (
  id            SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  company       TEXT,
  rating        INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  message       TEXT NOT NULL,
  published     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
