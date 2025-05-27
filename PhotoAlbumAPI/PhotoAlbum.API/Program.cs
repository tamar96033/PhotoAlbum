using Amazon;
using Amazon.S3;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PhotoAlbum.API;
using PhotoAlbum.Core.IRepositories;
using PhotoAlbum.Core.IServices;
using PhotoAlbum.Data;
using PhotoAlbum.Data.Repositories;
using PhotoAlbum.Service;
using PhotoAlbum.Service.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    //.AddJsonFile("secret.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

//for the upload controller
builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddAWSService<IAmazonS3>();

//this code is for the cloud.......
//builder.Services.AddSingleton<IAmazonS3>(sp =>
//{
//    var configuration = builder.Configuration;

//    var awsAccessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
//    var awsSecretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
//    var region = configuration["AWS:Region"] ?? "us-east-1"; // ברירת מחדל אם לא נמצא

//    return new AmazonS3Client(awsAccessKey, awsSecretKey, RegionEndpoint.GetBySystemName(region));
//});
//this is for the environment.


builder.Services.AddSingleton<IAmazonS3>(sp =>
{
    var configuration = builder.Configuration;

    var awsAccessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");//configuration["AWS:AWS_ACCESS_KEY_ID"];
    var awsSecretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY"); //configuration["AWS:AWS_SECRET_ACCESS_KEY"];
    var region = Environment.GetEnvironmentVariable("Region") ?? "us-east-1";//configuration["AWS:Region"] ?? "us-east-1";

    var config = new AmazonS3Config
    {
        RegionEndpoint = RegionEndpoint.GetBySystemName(region),
        ForcePathStyle = true // Ensures URL is like s3.{region}.amazonaws.com/bucket-name/key
    };

    try
    {
        var s3Client = new AmazonS3Client(awsAccessKey, awsSecretKey, config);

        // Optional: test connection
        var response = s3Client.ListBucketsAsync().Result;
        Console.WriteLine(response.HttpStatusCode == System.Net.HttpStatusCode.OK
            ? "Connection successful!"
            : $"Failed to connect to S3. Status code: {response.HttpStatusCode}");

        return s3Client;
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error connecting to AWS: " + ex.Message);
        throw;
    }
});


//builder.Services.AddSingleton<IAmazonS3>(sp =>
//{
//    var configuration = builder.Configuration;

//    var awsAccessKey = configuration["AWS:AWS_ACCESS_KEY_ID"];
//    var awsSecretKey = configuration["AWS:AWS_SECRET_ACCESS_KEY"];
//    var region = configuration["AWS:Region"] ?? "us-east-1"; // Default region if not found

//    Console.WriteLine("the keys are:" + awsAccessKey + ", " + awsSecretKey);

//    try
//    {
//        var s3Client = new AmazonS3Client(awsAccessKey, awsSecretKey, RegionEndpoint.GetBySystemName(region));

//        // Attempt to list S3 buckets to verify connection
//        var response = s3Client.ListBucketsAsync().Result;

//        if (response.HttpStatusCode == System.Net.HttpStatusCode.OK)
//        {
//            Console.WriteLine("Connection successful!");
//        }
//        else
//        {
//            Console.WriteLine("Failed to connect to S3. Status code: " + response.HttpStatusCode);
//        }

//        return s3Client;
//    }
//    catch (Exception ex)
//    {
//        Console.WriteLine("Error connecting to AWS: " + ex.Message);
//        throw; // rethrow the exception after logging
//    }
//});
//builder.Services.AddSingleton<IAmazonS3>(sp =>
//{
//    var configuration = builder.Configuration;

//    var awsAccessKey = builder.Configuration["AWS:AWS_ACCESS_KEY_ID"];
//    var awsSecretKey = builder.Configuration["AWS:AWS_SECRET_ACCESS_KEY"];
//    // Read AWS credentials from secret.json
//    //var awsAccessKey = configuration["AWS:AccessKey"];
//    //var awsSecretKey = configuration["AWS:SecretKey"];
//    var region = configuration["AWS:Region"] ?? "us-east-1"; // Default region if not found

//    Console.WriteLine("the keys are:" + awsAccessKey + ", " + awsSecretKey);

//    return new AmazonS3Client(awsAccessKey, awsSecretKey, RegionEndpoint.GetBySystemName(region));
//});

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

builder.Services.AddSwaggerGen(c =>
{
    c.OperationFilter<AddAuthHeaderOperationFilter>();
});

builder.Services.AddScoped<IAlbumService, AlbumService>();
builder.Services.AddScoped<IAlbumRepository, AlbumRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IS3Service, S3Service>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<IPictureRepository, PictureRepository>();
builder.Services.AddScoped<IPictureService, PictureService>();
builder.Services.AddScoped<IAIPictureService, AIPictureService>();
builder.Services.AddScoped<ITagService, TagService>();

builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();
builder.Services.AddHttpClient<IAIPictureService, AIPictureService>();

builder.Services.AddDbContext<DataContext>();
//builder.Services.AddDbContext<DataContext>(options =>
//    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
//        new MySqlServerVersion(new Version(8, 0, 23))));

builder.Services.AddAutoMapper(typeof(MappingProfile));

var jwtKey = builder.Configuration["JWT__Key"];
if (string.IsNullOrEmpty(jwtKey))
{
    Console.WriteLine("JWT__Key is missing from configuration");
}

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JWT__Issuer"],//["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT__Audience"],//["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT__Key"]))//"JWT:Key"
        };
    });

// הוספת הרשאות מבוססות-תפקידים
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("AdminOrUser", policy => policy.RequireRole("User", "Admin"));
    options.AddPolicy("UserOnly", policy => policy.RequireRole("User"));
});


// Add services to the container.
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowSpecificOrigin", policy =>
//    {
//        policy.WithOrigins("https://photoalbumclient.onrender.com", "http://localhost:5173")
//              .AllowAnyMethod()
//              .AllowAnyHeader()
//              .AllowCredentials();
//    });
//});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        var origins = new[] {
            "https://photoalbumclient.onrender.com"
        };

        // Add localhost only in development
        if (builder.Environment.IsDevelopment())
        {
            origins = origins.Concat(new[] { "http://localhost:5173", "http://localhost:4200", "https://photoalbumclient.onrender.com" }).ToArray();
        }

        policy.WithOrigins(origins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//app.UseCors("AllowSpecificOrigin");
//app.UseCors("AllowLocalhost");
app.UseCors("AllowFrontend");

app.Use(async (context, next) =>
{
    Console.WriteLine("Request Origin: " + context.Request.Headers["Origin"]);

    if (context.Request.Method == "OPTIONS")
    {
        context.Response.StatusCode = 200;
        await context.Response.CompleteAsync();
        return;
    }

    await next();
});


app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.UseDeveloperExceptionPage();

app.Run();
