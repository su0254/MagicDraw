using Children_s_drawing.Core.Entities;
using Children_s_drawing.Core.InterfacesRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using dotenv.net;

namespace Children_s_drawing.Data.Repositories
{
    public class PaintingRepository : Repository<Painting>, IPaintingRepository
    {

        public PaintingRepository(DataContext dataContext) : base(dataContext)
        {
            
        }

        // Upload an image and log the response to the console
        //=================
        //public Painting UploadImage()
        //{
        //    var uploadParams = new ImageUploadParams()
        //    {
        //        File = new FileDescription(@"https://cloudinary-devs.github.io/cld-docs-assets/assets/images/cld-sample.jpg"),
        //        UseFilename = true,
        //        UniqueFilename = false,
        //        Overwrite = true
        //    };
        //    var uploadResult = cloudinary.Upload(uploadParams);
        //    Console.WriteLine(uploadResult.JsonObj);
        //    // Get details of the image and run quality analysis
        //    //==============================

        //    var getResourceParams = new GetResourceParams("cld-sample")
        //    {
        //        QualityAnalysis = true
        //    };
        //    var getResourceResult = cloudinary.GetResource(getResourceParams);
        //    var resultJson = getResourceResult.JsonObj;

        //    // Log quality analysis score to the console
        //    Console.WriteLine(resultJson["quality_analysis"]);
        //}
    }
}
