using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using HopeAtHand.Models;
using Microsoft.EntityFrameworkCore;
using HopeAtHand.Models.Managers;
using HopeAtHand.SearchRepositories;

namespace HopeAtHand
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1).AddJsonOptions(
            options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddTransient<IDocumentManager, DocumentManager>();
            services.AddTransient<IPoemRepo, PoemRepository>();
            services.AddTransient<IThemeManager, ThemeManager>();
            services.AddTransient<IArtPieceManager, ArtPieceManager>();
            services.AddTransient<IPoemManager, PoemManager>();
            services.AddTransient<IWritingTemplateManager, WritingTemplateManager>();
            services.AddTransient<IDocumentConnector, DocumentConnector>();
            services.AddTransient<ILessonPlanCreateManager, LessonPlanCreateManager>();
            services.AddTransient<IUserManager, UserManager>();
            services.AddTransient<IFavoriteManager, FavoriteManager>();
            services.AddTransient<IPoemSearchRepository, PoemSearchRepository>();
            services.AddTransient<IWritingAssignmentSearchRepository, WritingAssignmentSearchRepository>();
            services.AddTransient<IArtPieceSearchRepository, ArtPieceSearchRepository>();
            services.AddTransient<ILessonPlanSearchRepository, LessonPlanSearchRepository>();
            services.AddTransient<IThemeSearchRepositroy, ThemeSearchRepository>();


            services.AddCors();
            services.AddOptions();
            services.AddDbContext<ApplicationDbContext>( options => options.UseSqlServer("Server=tcp:sql-server-test-will.database.windows.net,1433;Initial Catalog=HopeAtHand;Persist Security Info=False;User ID=William;Password=WillMill1;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"));

            services.Configure<AzureStorageConfig>(Configuration.GetSection("AzureStorageConfig"));
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseCors(options =>
               options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
