using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetStationsPlayer.DAL
{
    public interface IStationsRepository
    {
        IList<Station> GetStations();
        Station GetStation(int id);
        void SaveStations(IList<Station> stations);
        void SaveGroups(IList<StationsGroup> groups);
        IList<StationsGroup> GetGroups();
        IList<Usage> GetUsages();
        void SaveUsages(IList<Usage> usages);
    }
}
