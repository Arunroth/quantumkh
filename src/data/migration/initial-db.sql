-- Hero Table
CREATE TABLE hero (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    description TEXT,
    banner TEXT
);

-- Feature Table
CREATE TABLE features (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    icon VARCHAR(50) NOT NULL
);

-- Service Table
CREATE TABLE services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL
);

-- Machine Table
CREATE TABLE machines (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    image VARCHAR(255) NOT NULL,
    workspace VARCHAR(255) NOT NULL,
    speed VARCHAR(255) NOT NULL,
    accuracy VARCHAR(255) NOT NULL,
    materials TEXT,
    description TEXT,
    range INT NOT NULL
);

-- Project Table
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    client VARCHAR(255) NOT NULL,
    description TEXT ,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    completion VARCHAR(255) NOT NULL,
    range INT NOT NULL
);

-- Client Table
CREATE TABLE clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    industry VARCHAR(255),
    type VARCHAR(255) NOT NULL,
    testimonial TEXT,
    author VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    range INT NOT NULL
);

CREATE TABLE project_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  projectId VARCHAR(255) NOT NULL,
  vat VARCHAR(255),
  status VARCHAR(20) CHECK (status IN ('queued', 'in-progress', 'completed')) NOT NULL,
  stage VARCHAR(255) NOT NULL,
  startdate TIMESTAMP NOT NULL,
  estimatedcompletion TIMESTAMP NOT NULL,
  progress INTEGER CHECK (progress >= 0 AND progress <= 100) NOT NULL
);

CREATE TABLE project_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  projectid VARCHAR(255) NOT NULL,
  date TIMESTAMP NOT NULL,
);