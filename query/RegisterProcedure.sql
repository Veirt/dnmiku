-- DNMembership
USE [DNMembership] 
GO
	CREATE PROCEDURE [dbo].[__RegisterProcedure] ( @id NVarChar ( 50 ),
    @password VARCHAR ( 12 ),
    @email VARCHAR ( 50 ) ) AS BEGIN
		INSERT INTO DNMembership.dbo.Accounts ( AccountName, AccountLevelCode, CharacterCreateLimit, CharacterMaxCount, RegisterDate, PublisherCode, Passphrase, mail )
	VALUES
		(
			@id,
			0,
			4,
			8,
			GETDATE( ),
			0,
			CONVERT ( BINARY ( 20 ), HashBytes ( 'MD5',@password ), 2 ), 
			@email 
		) 
END