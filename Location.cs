using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WeatherApp
{
    public class Location
    {
        public string Name { get; set; }
        public int Count { get; set; }

        public Location(string name, int count)
        {
            Name = name;
            Count = count;
        }
    }
}