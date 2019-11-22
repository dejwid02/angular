using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InternetStationsPlayer.DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
namespace InternetStationsPlayer.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsageController : ControllerBase
    {
        public UsageController(IStationsRepository repository, IHostEnvironment hostingEnvironment)
        {
            Repository = repository;
            HostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public ActionResult<IList<Usage>> Get()
        {
           return Ok(Repository.GetUsages());
        }

        [HttpPut]
        public ActionResult<Usage> Get(Station station)
        {
            var usages = Repository.GetUsages();
            var selectedUsage = usages.FirstOrDefault(u => u.Station.Id == station.Id);
            if (selectedUsage==null)
            {
                selectedUsage = new Usage() { Station = station };
                usages.Add(selectedUsage);

            }
            selectedUsage.NoOfTimesPlayed += 1.0;
            Repository.SaveUsages(usages);
            return Ok(selectedUsage);
        }

        public IStationsRepository Repository { get; }
        public IHostEnvironment HostingEnvironment { get; }
    }
}