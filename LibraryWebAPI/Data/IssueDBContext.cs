using LibraryWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryWebAPI.Data
{
    public class IssueDBContext : DbContext
    {
        public IssueDBContext(DbContextOptions<IssueDBContext> options) : base(options)
        {

        }

        public DbSet<Issue> Issues { get; set; }
    }
}
