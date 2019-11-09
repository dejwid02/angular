using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace InternetStationsPlayer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IHostEnvironment hostingEnvironment)
        {
            _logger = logger;
            this.hostingEnvironment = hostingEnvironment;
        }

        public IHostEnvironment hostingEnvironment { get; }

        [HttpGet]
        public IEnumerable<Station> Get()
        {
            var path = Path.Combine(hostingEnvironment.ContentRootPath, "stations.json");

            return GetStations(path);
        }

        [HttpPost]
        public IEnumerable<Station> Create(Station station)
        {
            var path = Path.Combine(hostingEnvironment.ContentRootPath, "stations.json");
            var stations = GetStations(path);
            stations.Add(station);
            SaveStations(path, stations);
            return stations;
        }

        private static IList<Station> GetStations(string path)
        {
            var content = System.IO.File.ReadAllText(path);
           return JsonSerializer.Deserialize<IList<Station>>(content);
        }

        private void SaveStations(string path, IList<Station> stations)
        {
            var serialized = JsonSerializer.Serialize(stations);
            System.IO.File.WriteAllText(path, serialized);
        }
    }
}
