CREATE PROCEDURE DNMembership.dbo.AddCash
@IntCashAmount nvarchar (10)
AS
UPDATE Accounts
SET cash += @IntCashAmount
WHERE EXISTS (SELECT AccountDBID FROM DNMembership.dbo.DNAuth WHERE DNAuth.AccountDBID = Accounts.AccountID AND DNAuth.CertifyingStep = 2);