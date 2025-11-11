using Microsoft.EntityFrameworkCore;
using Task = TaskApi.Models.Entities.Task;

namespace TaskApi.Data
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
        }

        public DbSet<Task> Task { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Task>(entity =>
            {
                entity.ToTable("task")
                    .HasCharSet("utf8mb4")
                    .UseCollation("utf8mb4_unicode_ci");

                entity.Property(e => e.Title)
                    .HasColumnType("LONGTEXT")
                    .HasCharSet("utf8mb4")
                    .UseCollation("utf8mb4_unicode_ci");
                entity.HasKey(entity => entity.Id);
                entity.Property(entity => entity.Title);
                entity.Property(entity => entity.CreatedAt);
                entity.Property(entity => entity.DueDate);
                entity.Property(entity => entity.Status);
                entity.Property(entity => entity.Priority);
            });
        }
    }
}