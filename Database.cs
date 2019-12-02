using System;
using System.Collections.Generic;
using System.Data;

using MySql.Data;
using MySql.Data.MySqlClient;

namespace WeatherApp
{
    public class Database
    {
        public static string AddNew(string location, string name)
        {
            string connStr = "server=remotemysql.com;user=TrhWMNGI2l;database=TrhWMNGI2l;port=3306;password=kzP8t1xtdX";
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();

                string sql = @"INSERT INTO searches (location, count, name)
                                VALUES('" + location + "', 1, " + "'" + name + @"')
                                ON DUPLICATE KEY UPDATE count = count + 1;";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }

            conn.Close();
            return "Added new location to database";
        }

        // Method to get a list of all searched locations
        public static List<Location> GetAll()
        {
            // List of all the locations
            List<Location> locations = new List<Location>();

            string connStr = "server=remotemysql.com;user=TrhWMNGI2l;database=TrhWMNGI2l;port=3306;password=kzP8t1xtdX";
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();

                string sql = "SELECT * FROM searches ORDER BY count desc";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    locations.Add(new Location(rdr[3].ToString(), (int)rdr[2]));
                }
                rdr.Close();
            }
            catch (Exception ex)
            {
                return locations;
            }

            conn.Close();
            return locations;
        }
    }
}