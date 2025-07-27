using Microsoft.EntityFrameworkCore;
using Practise.Models;

namespace Practise.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> users { get; set; }
        public DbSet<Routes> route { get; set; }
        public DbSet<Schedules> schedules { get; set; }
        public DbSet<Reservations> reservations { get; set; }
        public DbSet<ReservationsDetail> reservationsDetail { get; set; }

        public DbSet<Bus> bus { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Routes>().ToTable("routes");
            modelBuilder.Entity<Schedules>().ToTable("schedules");
            modelBuilder.Entity<Reservations>().ToTable("reservations");
            modelBuilder.Entity<ReservationsDetail>().ToTable("reservations_detail");
            modelBuilder.Entity<Bus>().ToTable("buses");

            modelBuilder.Entity<Schedules>().HasOne(s => s.routes).WithMany(r => r.schedules)
                .HasForeignKey(f => f.route_id);

            modelBuilder.Entity<ReservationsDetail>().HasOne(s => s.reservations).WithMany(r => r.reservationsDetail)
                .HasForeignKey(f => f.reservation_id);
        }
    }
}