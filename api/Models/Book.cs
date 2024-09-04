using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;
        public int ReleaseDate { get; set; }
        public string ImageURL { get; set; } = "https://placehold.co/400x600?text=No+Photo&font=roboto";
        public string ISBN { get; set; } = string.Empty;

    }
}