using HopeAtHand.Controllers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HopeAtHand.Models.Managers
{
    public interface IUserManager{
        Facilitator DoesFacilitatorExist(string username);
        Facilitator CreateFacilitator(CreateUserDTO create);
        List<Facilitator> GetFacilitators();
        Facilitator ChangeRole(ChangeRoleDTO roleDTO);
        List<Facilitator> ByRole(string Role);
        List<Facilitator> SearchForFacilitator(string name);
        Facilitator LogIn(string username, string password);
        string changePassword(UserController.LoginDTO login);
        Facilitator ResetPassword(ResetDTO reset);
    }
    public class UserManager : IUserManager{
        private readonly ApplicationDbContext Data;
        public UserManager(ApplicationDbContext data){
            Data= data;
        }
        public Facilitator DoesFacilitatorExist(string username){
            return Data.Facilitators.Where( f => f.Email == username).FirstOrDefault();
        }

        public Facilitator CreateFacilitator(CreateUserDTO create ){
            if(DoesFacilitatorExist(create.email) == null)
            {
                Facilitator facilitator = new Facilitator()
                {
                    Role = "Facilitator",
                    Email = create.email.ToLower(),
                    Name = create.name,
                    Org = create.org,
                    Phone = create.phone,
                    UserSince = DateTime.Today,
                };
                GeneratePassword(facilitator);
                Data.Add(facilitator);
                Data.SaveChanges();
                return facilitator;
            }
            return null;
        }
        
        public List<Facilitator> GetFacilitators()
        {
            return Data.Facilitators.ToList();
        }

        public List<Facilitator> SearchForFacilitator(string name)
        {
            string searchString = name.ToLower();
            return Data.Facilitators.Where(w => w.Email.ToLower().Contains(searchString)).ToList();
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

        public void GeneratePassword(Facilitator facilitator, string Password = "AtHand2019" )
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                byte[] passwordSalt = hmac.Key;
                /*Currently this method uses a non secure version of semetric key enncryption*/
                facilitator.PasswordSalt = passwordSalt;
                facilitator.Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(Password));
            }
        }
        public byte[] GeneratePasswordForLogin(byte[] facilitatorSalt, string Password)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(facilitatorSalt))
            {
                hmac.Key = facilitatorSalt;
                return hmac.ComputeHash(Encoding.UTF8.GetBytes(Password));
            }
        }

        public Facilitator LogIn(string username, string password)
        {
            Facilitator user = Data.Facilitators.Where(f => f.Email == username).FirstOrDefault();
            if(user == null)
            {
                return null;
            }
            var hash = GeneratePasswordForLogin(user.PasswordSalt, password);
            var authorized = true;
            for(int x =  0; x < hash.Length; x++)
            {
                if(hash[x] != user.Password[x])
                {
                    return null;
                }
            }
            return user;

        }

        public string changePassword(UserController.LoginDTO login)
        {
            Facilitator user = Data.Facilitators.Where(w => w.Email == login.Username).FirstOrDefault();
            if(user == null)
            {
                return "Could Not Find User";
            }
            Data.Update(user);
            GeneratePassword(user, login.Password);
            user.ChangePassword = "No";
            Data.SaveChanges();
            return user.ChangePassword;
        }

        public Facilitator ResetPassword(ResetDTO reset)
        {
           
            Facilitator user = Data.Facilitators.Find(Int32.Parse(reset.email));
            if(user == null)
            {
                return user;
            }
            Data.Update(user);
            GeneratePassword(user);
            user.ChangePassword = "Yes";

            Data.SaveChanges();
            return user;
        }
    }
}