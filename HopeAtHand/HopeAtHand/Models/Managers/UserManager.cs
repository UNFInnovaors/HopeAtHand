using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models.Managers
{
    public interface IUserManager{
        Facilitator DoesFacilitatorExist(string username);
        Facilitator CreateFacilitator(string username, string role = "Facilitator");
        List<Facilitator> GetFacilitators();
        Facilitator ChangeRole(ChangeRoleDTO roleDTO);
        List<Facilitator> ByRole(string Role);
        List<Facilitator> SearchForFacilitator(string name);
    }
    public class UserManager : IUserManager{
        private readonly ApplicationDbContext Data;
        public UserManager(ApplicationDbContext data){
            Data= data;
        }
        public Facilitator DoesFacilitatorExist(string username){
            return Data.Facilitators.Where( f => f.Username == username).FirstOrDefault();
        }

        public Facilitator CreateFacilitator(string username, string role = "Facilitator"){
            Facilitator facilitator = new Facilitator()
            {
                Role = role,
                Username = username
            };
            Data.Add(facilitator);
            Data.SaveChanges();
            return facilitator;
        }
        
        public List<Facilitator> GetFacilitators()
        {
            return Data.Facilitators.ToList();
        }

        public List<Facilitator> SearchForFacilitator(string name)
        {
            string searchString = name.ToLower();
            return Data.Facilitators.Where(w => w.Username.ToLower().Contains(searchString)).ToList();
        }

        public List<Facilitator> ByRole(string Role)
        {
            return Data.Facilitators.Where(w => w.Role == Role).ToList();
        }

        public Facilitator ChangeRole(ChangeRoleDTO roleDTO)
        {
            Facilitator facilitator = Data.Facilitators.Where(w => w.FacilitatorID == roleDTO.FacilitatorId).FirstOrDefault();
            if (facilitator == null)
                return facilitator;
            facilitator.Role = roleDTO.NewRole;
            Data.Update(facilitator);
            Data.SaveChanges();
            return facilitator;
        }
    }
}