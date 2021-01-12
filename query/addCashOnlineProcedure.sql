-- DNMembership
USE [DNMembership]
GO
CREATE PROCEDURE [dbo].[AddCash]
@IntCashAmount nvarchar (10)
AS

UPDATE Accounts
SET cash += @IntCashAmount
WHERE EXISTS (SELECT AccountDBID FROM DNAuth WHERE DNAuth.AccountDBID = Accounts.AccountID AND DNAuth.CertifyingStep = 2); 