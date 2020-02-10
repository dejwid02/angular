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
using InternetStationsPlayer.DAL;

namespace InternetStationsPlayer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StationsController : ControllerBase
    {
       

        private readonly ILogger<StationsController> _logger;

        public StationsController(ILogger<StationsController> logger, IStationsRepository repository,  IHostEnvironment hostingEnvironment)
        {
            _logger = logger;
            this.repository = repository;
            this.hostingEnvironment = hostingEnvironment;
        }

        public IStationsRepository repository { get; }
        public IHostEnvironment hostingEnvironment { get; }

        [HttpGet]
        public ActionResult<IEnumerable<Station>> Get()
        {
            return Ok(repository.GetStations());
        }

        [HttpPost]
        public ActionResult<Station> Create(Station station)
        {
            var stations = repository.GetStations();
            var id = stations.Max(s => s.Id);
            station.Id = id + 1;
            stations.Add(station);
            repository.SaveStations(stations);
            return Ok(station);
        }

        [HttpDelete]
        public ActionResult<IList<Station>> DeleteGroup(Station station)
        {
            var stations = repository.GetStations();
            stations = stations.Where(g => g.Id != station.Id).ToList();
            repository.SaveStations(stations);
            return Ok();
        }

        [HttpPut]
        public IEnumerable<Station> Update(Station station)
        {
            var stations = repository.GetStations();
            var existingStation = stations.First(s=>s.Id==station.Id);

            existingStation.ImageUrl = station.ImageUrl;
            existingStation.Name = station.Name;
            existingStation.Url = station.Url;
            
            repository.SaveStations(stations);
            return stations;
        }
    }
}
