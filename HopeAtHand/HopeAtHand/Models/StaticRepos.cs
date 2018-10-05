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
            {0, new Poem {Author = "Amelia Airhart", PoemId = 0, Tag = "Flying", Theme = "Female Empowerment", Title = "Airplane Over the Sea" }},
            {1, new Poem {Author = "Dale Enrheart", PoemId = 1, Tag="Racing", Theme ="Male Empowerment", Title="Spinning In Circles"} },
            {2, new Poem {Author = "Tom Hanks", PoemId = 2, Tag="Movies", Theme = "Self Acceptence", Title="Why Am I Here"}},
            {3, new Poem {Author = "Lou Lawson", PoemId = 3, Tag="Woods", Theme = "Connectivity" , Title = "In The Woods"}}
        };
    }
    public static class WritingAssignmentRepo
    {
        public static Dictionary<int, WritingAssignment> WritingAssignments => new Dictionary<int, WritingAssignment>
        {
            {0, new WritingAssignment{ WritingAssignmentId = 0, Title="What Makes Me Fly", Theme = "Female Empowerment", Tag="Flying"}},
            {1, new WritingAssignment{ WritingAssignmentId = 1, Title="What Blurs Around Me", Theme="Male Empowerment", Tag="Racing" }},
            {2, new WritingAssignment{ WritingAssignmentId = 2, Title="When People Look at Me", Theme="Self Acceptence", Tag="Movies"}},
            {3, new WritingAssignment{ WritingAssignmentId = 3, Title="Through The Trees", Theme="Connectivity", Tag="Woods"} }
        };
    }
    public static class ArtPiecesRepo
    {
        public static Dictionary<int, ArtPiece> ArtPieces => new Dictionary<int, ArtPiece>
        {
            {0, new ArtPiece{ ArtPieceId = 0, Title="Dream Vaction", Theme="Female Empowerment", Tag="Flying"}},
            {1, new ArtPiece{ ArtPieceId = 1, Title="Vroom Vroom", Theme = "Male Empowerment", Tag="Racing"}},
            {2, new ArtPiece{ ArtPieceId = 2, Title="On The Big Screen", Theme = "Self Acceptence", Tag="Moveies" }},
            {3, new ArtPiece{ ArtPieceId = 3, Title="A Pretty Flower", Theme = "Connectivity", Tag="Woods" } }
        };
    }
    public static class LessonPlanRepo
    {
        public static Dictionary<int, LessonPlan> LessonPLans => new Dictionary<int, LessonPlan>
        {
            {0, new LessonPlan{ LessonPlanId = 0, ArtPieceId = 0, PoemId = 0, WritingAssignmentId =0, Theme="Female Empowerment", Tag="Flying", Name="Flying Around" }},
            {1, new LessonPlan{ LessonPlanId = 1, ArtPieceId = 1, PoemId = 1, WritingAssignmentId =1, Theme="Male Empowerment", Tag="Racing", Name="No Cars Go"}},
            {2, new LessonPlan{ LessonPlanId = 2, ArtPieceId = 2, PoemId = 2, WritingAssignmentId =2,  Theme="Self Acceptence", Tag="Movies", Name="This is sample data" }},
            {3, new LessonPlan{ LessonPlanId = 3, ArtPieceId = 3, PoemId = 3, WritingAssignmentId =3, Theme="Connectivity", Tag = "Woods", Name="I Enjoy Making Sample Data" }},
        };
    }
}
