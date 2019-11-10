using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace InternetStationsPlayer.DAL
{
    public class StationsRepository : IStationsRepository
    {
        public StationsRepository(IHostEnvironment hostingEnvironment)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

        public IHostEnvironment hostingEnvironment { get; }

        public Station GetStation(int id)
        {
            return GetStations()[id];
        }

        public IList<Station> GetStations()
        {
            var content = System.IO.File.ReadAllText(GetJsonFilePath());
            return JsonConvert.DeserializeObject<IList<Station>>(content);
        }

        public void SaveStations(IList<Station> stations)
        {
            var serialized = JsonConvert.SerializeObject(stations);
            System.IO.File.WriteAllText(GetJsonFilePath(), serialized);
        }

        private string GetJsonFilePath() => Path.Combine(hostingEnvironment.ContentRootPath, "stations.json");
    }
}
