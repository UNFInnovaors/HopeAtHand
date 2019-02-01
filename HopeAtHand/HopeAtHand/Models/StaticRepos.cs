using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models
{
    public static class PoemRepo
    {
        public static Dictionary<int,Poem> Poems => new Dictionary<int,Poem>
        {
            
            {0, new Poem {Author = "Amelia Airhart", PoemId = 0,  Themes = new List<PoemThemes>  { new PoemThemes {ThemeName = "Female Empowerment" } }, Title = "Airplane Over the Sea" }},
            {1, new Poem {Author = "Dale Enrheart", PoemId = 1,  Themes = new List<PoemThemes>  { new PoemThemes {ThemeName = "Female Empowerment"} }, Title="Spinning In Circles"} },
            {2, new Poem {Author = "Tom Hanks", PoemId = 2, Themes = new List<PoemThemes>  { new PoemThemes {ThemeName = "Female Empowerment"} }, Title="Why Am I Here"}},
            {3, new Poem {Author = "Lou Lawson", PoemId = 3, Themes = new List<PoemThemes>  { new PoemThemes {ThemeName = "Female Empowerment"} }, Title = "In The Woods"}}
        };
    }
    public static class WrittingAssignmentRepo
    {
        public static Dictionary<int, WritingAssignment> WritingAssignments => new Dictionary<int, WritingAssignment>
        {
            {0, new WritingAssignment{ WritingAssignmentId = 0, Title="What Makes Me Fly",Themes = new List<WritingThemes>  { new WritingThemes { ThemeName = "Female Empowerment"} }}},
            {1, new WritingAssignment{ WritingAssignmentId = 1, Title="What Blurs Around Me",Themes = new List<WritingThemes>  { new WritingThemes { ThemeName = "Female Empowerment"} }}},
            {2, new WritingAssignment{ WritingAssignmentId = 2, Title="When People Look at Me", Themes = new List<WritingThemes>  { new WritingThemes { ThemeName = "Female Empowerment"} }}},
            {3, new WritingAssignment{ WritingAssignmentId = 3, Title="Through The Trees", Themes = new List<WritingThemes>  { new WritingThemes {ThemeName = "Female Empowerment"} }} }
        };
    }
    public static class ArtPiecesRepo
    {
        public static Dictionary<int, ArtPiece> ArtPieces => new Dictionary<int, ArtPiece>
        {
            {0, new ArtPiece{ ArtPieceId = 0, Title="Dream Vaction",ArtThemes = new List<ArtThemes>  { new ArtThemes {ThemeName = "Female Empowerment"}}}},
            {1, new ArtPiece{ ArtPieceId = 1, Title="Vroom Vroom", ArtThemes = new List<ArtThemes>  { new ArtThemes {ThemeName = "Female Empowerment"}}}},
            {2, new ArtPiece{ ArtPieceId = 2, Title="On The Big Screen", ArtThemes = new List<ArtThemes>  { new ArtThemes {ThemeName = "Female Empowerment"}}}},
            {3, new ArtPiece{ ArtPieceId = 3, Title="A Pretty Flower", ArtThemes = new List<ArtThemes>  { new ArtThemes {ThemeName = "Female Empowerment"}}}}
        };
    }
    /*public static class LessonPlanRepo
    {
        public static Dictionary<int, LessonPlan> LessonPLans => new Dictionary<int, LessonPlan>
        {
            {0, new LessonPlan{ LessonPlanId = 0,  Themes = new List<LessonThemes>  { new LessonThemes { ThemeName = "Female Empowerment"} }, Name="Flying Around" }},
            {1, new LessonPlan{ LessonPlanId = 1,  Themes = new List<LessonThemes>  { new LessonThemes { ThemeName = "Female Empowerment"} }, Name="No Cars Go"}},
            {2, new LessonPlan{ LessonPlanId = 2,  Themes = new List<LessonThemes>  { new LessonThemes { ThemeName = "Female Empowerment"} }, Name="This is sample data" }},
            {3, new LessonPlan{ LessonPlanId = 3,  Themes = new List<LessonThemes>  { new LessonThemes { ThemeName = "Female Empowerment"} }, Name="I Enjoy Making Sample Data" }},
        };
    }*/
}
