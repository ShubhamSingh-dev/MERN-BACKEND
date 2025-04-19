-- Database related queries

CREATE DATABASE college; --*This is bad approach 
-- Industry standards are , 
CREATE DATABASE IF NOT EXISTS college; --*This is #good approach

-- ?drop database

DROP DATABASE college; --*This is bad approach
-- Industry standards are ,
DROP DATABASE IF EXISTS college; --*This is #good approach


-- show database 

SHOW DATABASES; --*Shows all databases
-- Industry standards are ,
SHOW DATABASES LIKE 'college'; --*Filters the database name