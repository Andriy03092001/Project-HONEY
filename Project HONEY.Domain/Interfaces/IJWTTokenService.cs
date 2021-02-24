
using Project_STUDENTS.DataAccess.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_IDA.Domain.Interfaces
{
    public interface IJWTTokenService
    {
        string CreateToken(User user);
    }
}
