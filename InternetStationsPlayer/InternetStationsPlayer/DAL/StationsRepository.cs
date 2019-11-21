﻿using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

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
            return GetStations().First(s => s.Id == id);
        }

        public IList<Station> GetStations()
        {

            var content = System.IO.File.ReadAllText(GetStationsJsonFilePath());
            var stations = JsonConvert.DeserializeObject<IList<Station>>(content);
            return stations;

        }

        public IList<StationsGroup> GetGroups()
        {

            var content = System.IO.File.ReadAllText(GetStationsJsonFilePath());
            var stations = JsonConvert.DeserializeObject<IList<Station>>(content);

            var groupContent = System.IO.File.ReadAllText(GetStationsGroupsFilePath());
            var groups = JsonConvert.DeserializeObject<IList<StationsGroup>>(groupContent);

            foreach (var group in groups)
            {
                group.Stations = group.Stations.Select(s => stations.Single(s2 => s2.Id == s.Id)).ToList();

            }
            return groups;

        }

        public void SaveStations(IList<Station> stations)
        {
            var serialized = JsonConvert.SerializeObject(stations);
            System.IO.File.WriteAllText(GetStationsJsonFilePath(), serialized);
        }

        public void SaveGroups(IList<StationsGroup> groups)
        {

            foreach (var group in groups)
            {
                group.Stations = group.Stations.Select(s => new Station { Id = s.Id }).ToList();
            }
            var serialized = JsonConvert.SerializeObject(groups);
            System.IO.File.WriteAllText(GetStationsGroupsFilePath(), serialized);
        }

        private string GetStationsJsonFilePath() => Path.Combine(hostingEnvironment.ContentRootPath, "stations.json");
        private string GetStationsGroupsFilePath() => Path.Combine(hostingEnvironment.ContentRootPath, "groups.json");
    }
}
