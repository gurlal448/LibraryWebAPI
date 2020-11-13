SET IDENTITY_INSERT [dbo].[Issues] ON 
GO
INSERT [dbo].[Issues] ([IssueID], [StudentID], [BookName], [IssueDate], [IssueStatus]) VALUES (1, 234324, N'The Java Programming Language', N'2020-11-02', N'Issued')
GO
INSERT [dbo].[Issues] ([IssueID], [StudentID], [BookName], [IssueDate], [IssueStatus]) VALUES (2, 741852, N'Close to the Machine', N'2020-10-05', N'Issued')
GO
INSERT [dbo].[Issues] ([IssueID], [StudentID], [BookName], [IssueDate], [IssueStatus]) VALUES (3, 112222, N'The Art of Computer Programming', N'2020-06-11', N'Issued')
GO
SET IDENTITY_INSERT [dbo].[Issues] OFF
GO
