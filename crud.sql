USE [ItegratedRetail]
GO
/****** Object:  Table [dbo].[Items]    Script Date: 3/1/2019 6:27:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Items](
	[Items_Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Price] [int] NULL,
	[Qty] [int] NULL,
	[TotalPrice] [int] NULL,
 CONSTRAINT [PK_Items] PRIMARY KEY CLUSTERED 
(
	[Items_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Items] ON 

INSERT [dbo].[Items] ([Items_Id], [Name], [Price], [Qty], [TotalPrice]) VALUES (1, N'Kemeja', 150000, 2, 300000)
SET IDENTITY_INSERT [dbo].[Items] OFF
/****** Object:  StoredProcedure [dbo].[DeleteItems]    Script Date: 3/1/2019 6:27:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[DeleteItems] (@Id INTEGER)


AS
BEGIN
	  DELETE Items 
      WHERE  Items_Id = @Id; 
	
END

GO
/****** Object:  StoredProcedure [dbo].[InsertUpdateItems]    Script Date: 3/1/2019 6:27:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[InsertUpdateItems] 

(@Id      INTEGER, 
                                       @Name    NVARCHAR(50), 
                                       @Price     INTEGER, 
                                       @Qty  INTEGER,  
                                       @TotalPrice INTEGER, 
                                       @Action  VARCHAR(10)) 

AS
BEGIN
	IF @Action = 'Insert' 
        BEGIN 
            INSERT INTO Items 
                        (Name, 
                         Price, 
                         Qty, 
                         TotalPrice) 
            VALUES     (@Name, 
                        @Price, 
                        @Qty, 
                        @TotalPrice); 
        END 


		IF @Action = 'Update'
		BEGIN
			UPDATE Items
			SET Name = @Name,
			Price = @Price,
			Qty = @Qty,
			TotalPrice = @TotalPrice
			WHERE Items_Id = @Id;

			END
	
END

GO
/****** Object:  StoredProcedure [dbo].[SelectItems]    Script Date: 3/1/2019 6:27:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SelectItems]
AS
BEGIN
    SELECT * 
      FROM   [ItegratedRetail].[dbo].[Items]
END

GO
