using Microsoft.EntityFrameworkCore;
using Practise.Data;

var builder = WebApplication.CreateBuilder(args);

var def = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySQL(def));

// Add other services
builder.Services.AddControllers();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(300);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {

        policy.SetIsOriginAllowed(origin =>
            origin.StartsWith("https://bus-reservation-system-in-asp-net-c") ||
            origin.StartsWith("http://localhost:5173") ||
            origin.StartsWith("http://192.168.1.18:5173")
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

app.Run("http://0.0.0.0:8080");
