-- USER SQL
CREATE USER FINANCIAL IDENTIFIED BY Welcome12345;

-- ADD ROLES
GRANT CONNECT TO FINANCIAL;
GRANT CONSOLE_DEVELOPER TO FINANCIAL;
GRANT DWROLE TO FINANCIAL;
GRANT GRAPH_DEVELOPER TO FINANCIAL;
GRANT OML_DEVELOPER TO FINANCIAL;
GRANT RESOURCE TO FINANCIAL;
ALTER USER FINANCIAL DEFAULT ROLE CONSOLE_DEVELOPER, DWROLE, GRAPH_DEVELOPER, OML_DEVELOPER;

-- REST ENABLE
BEGIN
    ORDS_ADMIN.ENABLE_SCHEMA(
        p_enabled => TRUE,
        p_schema => 'FINANCIAL',
        p_url_mapping_type => 'BASE_PATH',
        p_url_mapping_pattern => 'financial',
        p_auto_rest_auth => TRUE
    );
END;
/
-- ENABLE DATA SHARING
BEGIN
    C##ADP$SERVICE.DBMS_SHARE.ENABLE_SCHEMA(
        SCHEMA_NAME => 'FINANCIAL',
        ENABLED => TRUE
    );
END;
/

-- ENABLE GRAPH
ALTER USER FINANCIAL GRANT CONNECT THROUGH GRAPH$PROXY_USER;

-- ENABLE OML
ALTER USER FINANCIAL GRANT CONNECT THROUGH OML$PROXY;

-- QUOTA
ALTER USER FINANCIAL QUOTA UNLIMITED ON DATA;





-- USER SQL
CREATE USER FINANCIAL2 IDENTIFIED BY Welcome12345;

-- ADD ROLES
GRANT CONNECT TO FINANCIAL2;
GRANT CONSOLE_DEVELOPER TO FINANCIAL2;
GRANT DWROLE TO FINANCIAL2;
GRANT GRAPH_DEVELOPER TO FINANCIAL2;
GRANT OML_DEVELOPER TO FINANCIAL2;
GRANT RESOURCE TO FINANCIAL2;
ALTER USER FINANCIAL2 DEFAULT ROLE CONSOLE_DEVELOPER, DWROLE, GRAPH_DEVELOPER, OML_DEVELOPER;

-- REST ENABLE
BEGIN
    ORDS_ADMIN.ENABLE_SCHEMA(
        p_enabled => TRUE,
        p_schema => 'FINANCIAL2',
        p_url_mapping_type => 'BASE_PATH',
        p_url_mapping_pattern => 'financial2',
        p_auto_rest_auth => TRUE
    );
END;
/
-- ENABLE DATA SHARING
BEGIN
    C##ADP$SERVICE.DBMS_SHARE.ENABLE_SCHEMA(
        SCHEMA_NAME => 'FINANCIAL2',
        ENABLED => TRUE
    );
END;
/

-- ENABLE GRAPH
ALTER USER FINANCIAL2 GRANT CONNECT THROUGH GRAPH$PROXY_USER;

-- ENABLE OML
ALTER USER FINANCIAL2 GRANT CONNECT THROUGH OML$PROXY;

-- QUOTA
ALTER USER FINANCIAL2 QUOTA UNLIMITED ON DATA;

