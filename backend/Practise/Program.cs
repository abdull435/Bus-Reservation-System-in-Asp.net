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
<<<<<<< HEAD

        policy.SetIsOriginAllowed(origin =>
            origin.StartsWith("https://bus-reservation-system-in-asp-net-c") ||
            origin.StartsWith("http://localhost:5173") ||
            origin.StartsWith("http://192.168.1.18:5173")
        )

=======
            policy
.SetIsOriginAllowed(origin =>
    origin.StartsWith("https://bus-reservation-system-in-asp-net-c")
)
//         policy.WithOrigins(
//                 "http://localhost:5173",
//                 "http://192.168.1.12:5173",
//                 "https://bus-reservation-system-in-asp-net-c.vercel.app"
// )
>>>>>>> 52b794bd5e9d254fb456831e92ae943ee0304c78
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
