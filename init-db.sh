#!/bin/bash
# Replace placeholders in init.sql with the actual environment values
sed -i "s/{DB_SCHEMA}/$DB_SCHEMA/g" /tmp/init.sql

# Move the modified init.sql to the entrypoint directory
mv /tmp/init.sql /docker-entrypoint-initdb.d/init.sql

# Proceed with the default PostgreSQL entrypoint
exec docker-entrypoint.sh postgres