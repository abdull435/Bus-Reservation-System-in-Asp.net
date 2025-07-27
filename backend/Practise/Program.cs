using Microsoft.EntityFrameworkCore;
using Practise.Data;

var builder = WebApplication.CreateBuilder(args);

// Build connection string from environment variables
var dbHost = Environment.GetEnvironmentVariable("MYSQL_ADDON_HOST");
var dbPort = Environment.GetEnvironmentVariable("MYSQL_ADDON_PORT") ?? "3306";
var dbName = Environment.GetEnvironmentVariable("MYSQL_ADDON_DB");
var dbUser = Environment.GetEnvironmentVariable("MYSQL_ADDON_USER");
var dbPassword = Environment.GetEnvironmentVariable("MYSQL_ADDON_PASSWORD");

var connectionString = $"server={dbHost};port={dbPort};database={dbName};user={dbUser};password={dbPassword};";

// Register MySQL with Entity Framework
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySQL(connectionString));

// Add other services
builder.Services.AddControllers();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",       // for local dev
                "http://192.168.0.116:5173",   // LAN dev
                "https://bus-reservation-system-in-asp-net-p.vercel.app/" // Vercel frontend
)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

app.UseSession();
app.UseCors();
app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthorization();
app.MapControllers();

// Use PORT from Render
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
app.Run($"http://0.0.0.0:{port}");
