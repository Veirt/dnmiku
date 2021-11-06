-- Add a new column '[Avatar]' to table '[Accounts]' in schema '[dbo]'
ALTER TABLE [dbo].[Accounts]
    ADD [Avatar] /*new_column_name*/ varchar(40) /*new_column_datatype*/ NULL /*new_column_nullability*/
GO

-- Add a new column '[DiscordID]' to table '[Accounts]' in schema '[dbo]'
ALTER TABLE [dbo].[Accounts]
    ADD [DiscordID] /*new_column_name*/ varchar(20) /*new_column_datatype*/ NULL /*new_column_nullability*/
GO

-- Add a new column '[Email]' to table '[Accounts]' in schema '[dbo]'
ALTER TABLE [dbo].[Accounts]
    ADD [Email] /*new_column_name*/ varchar(50) /*new_column_datatype*/
GO
