using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRUDIntegratedRetail.Models
{
    public class Items
    {
        public int ItemsId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Qty { get; set; }
        public int TotalPrice { get; set; }

    }
}