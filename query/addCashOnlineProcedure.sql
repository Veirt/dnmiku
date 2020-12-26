CREATE PROCEDURE [dbo].[AddCash]
@IntCashAmount nvarchar (10)
AS
UPDATE Accounts
SET cash += @IntCashAmount
WHERE EXISTS (SELECT AccountDBID FROM DNMembership.dbo.DNAuth WHERE DNMembership.DNAuth.AccountDBID = Accounts.AccountID AND DNMembership.DNAuth.CertifyingStep = 2);