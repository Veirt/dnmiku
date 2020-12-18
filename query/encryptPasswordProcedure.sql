CREATE PROCEDURE EncryptPassword (
    @vchPassphrase varchar(12)
) 
AS
BEGIN
    SELECT
        CONVERT(BINARY(20),HashBytes('MD5', @vchPassphrase),2)
        AS EncryptedPassword
END;