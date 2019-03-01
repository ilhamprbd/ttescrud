using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CRUDIntegratedRetail.Models
{

    public class ItemsDB
    {
        //declare connection string
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        //Return list of all Items
        public List<Items> ListAll()
        {
            List<Items> lst = new List<Items>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SelectItems", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new Items
                    {
                        ItemsId = Convert.ToInt32(rdr["Items_Id"]),
                        Name = rdr["Name"].ToString(),
                        Price = Convert.ToInt32(rdr["Price"]),
                        Qty = Convert.ToInt32(rdr["Qty"]),
                        TotalPrice = Convert.ToInt32(rdr["TotalPrice"]),
                    });
                }
                return lst;
            }
        }
        //Method for Adding an Items
        public int Add(Items items)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateItems", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", items.ItemsId);
                com.Parameters.AddWithValue("@Name", items.Name);
                com.Parameters.AddWithValue("@Price", items.Price);
                com.Parameters.AddWithValue("@Qty", items.Qty);
                com.Parameters.AddWithValue("@TotalPrice", items.TotalPrice);
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }
        //Method for Updating Items record
        public int Update(Items items)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateItems", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", items.ItemsId);
                com.Parameters.AddWithValue("@Name", items.Name);
                com.Parameters.AddWithValue("@Price", items.Price);
                com.Parameters.AddWithValue("@Qty", items.Qty);
                com.Parameters.AddWithValue("@TotalPrice", items.TotalPrice);
                com.Parameters.AddWithValue("@Action", "Update");
                i = com.ExecuteNonQuery();
            }
            return i;
        }
        //Method for Deleting an Items
        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteItems", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}
