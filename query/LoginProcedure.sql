-- DNMembership
USE [DNMembership] 
GO
	CREATE PROCEDURE [dbo].[__LoginProcedure] ( @id NVarChar ( 50 ) ) AS BEGIN
	SELECT
		AccountID,
		AccountName,
		LastLoginDate,
		LastLogoutDate,
		RegisterDate,
		mail,
		cash,
		claimDaily 
	FROM
		DNMembership.dbo.Accounts 
	WHERE
	AccountName = @id 
END