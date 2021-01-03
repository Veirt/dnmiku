-- DNMembership
CREATE PROCEDURE [dbo].[checkCashPoint]
@intAccountID int
AS

SELECT DNMembership.dbo.Characters.CharacterID, DNMembership.dbo.Characters.CharacterName, DNWorld.dbo.Points.Point, DNMembership.dbo.Characters.AccountID, DNWorld.dbo.CharacterStatus.Fatigue FROM DNMembership.dbo.Characters LEFT JOIN DNWorld.dbo.Points ON DNMembership.dbo.Characters.CharacterID = DNWorld.dbo.Points.CharacterID AND DNWorld.dbo.Points.PointCode = 19 LEFT JOIN DNWorld.dbo.CharacterStatus ON DNMembership.dbo.Characters.CharacterID = DNWorld.dbo.CharacterStatus.CharacterID WHERE DNMembership.dbo.Characters.AccountID = @intAccountID