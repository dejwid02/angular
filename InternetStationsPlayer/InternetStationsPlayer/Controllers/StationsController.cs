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
        public IEnumerable<Station> Create(Station station)
        {
            var stations = repository.GetStations();
            stations.Add(station);
            repository.SaveStations(stations);
            return stations;
        }
    }
}
