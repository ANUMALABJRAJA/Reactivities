using Application.Activities.Queries;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Persistence;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opts =>{
    opts.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddMediatR(x =>{
    x.RegisterServicesFromAssemblyContaining<GetActivitiesList>();
});

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);


builder.Services.AddCors();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(x => x.AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("http://localhost:3000","https://localhost:3000"));
app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try{
 var context = services.GetRequiredService<AppDbContext>();
 await context.Database.MigrateAsync();
 await DbInitializer.SeedData(context);
}
catch(Exception e){
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(e, "Errror Occured during Exception");
}



app.Run();
