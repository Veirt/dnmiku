-- DNMembership
USE [DNMembership] 
GO
	CREATE PROCEDURE [dbo].[__Encrypt_Password] ( @vchPassphrase VARCHAR ( 12 ) ) AS BEGIN
	SELECT CONVERT
	( BINARY ( 20 ), HashBytes ( 'MD5', @vchPassphrase ), 2 ) AS EncryptedPassword 
END