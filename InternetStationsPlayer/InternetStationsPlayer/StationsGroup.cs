using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetStationsPlayer
{
    public class StationsGroup
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public IList<Station> Stations { get; set; }
    }
}
