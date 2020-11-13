using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryWebAPI.Models
{
    /// <summary>
    /// This class is Book Issue Status
    /// </summary>
    public class Issue
    {
        // Primary Key of Book Issue
        [Key]
        public int IssueID { get; set; }

        // Represent Student ID
        [Required]
        public int StudentID { get; set; }

        // Represent Book Name which is issued
        [Required]
        [StringLength(200)]
        public string BookName { get; set; }

        // Book Issue Date
        [Required]
        public string IssueDate { get; set; }

        [Required]
        public string IssueStatus { get; set; }
    }
}
