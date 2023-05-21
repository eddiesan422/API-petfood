const mongoose = require("mongoose");
const { Schema } = mongoose;

const feedingScheduleSchema = new mongoose.Schema({
  monday: [{ 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  }],
  tuesday: [{ 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  }],
  wednesday: [{ 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  }],
  thursday: [{ 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  }],
  friday: [{ 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  }],
  saturday: [{ 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  }],
  sunday: [{ 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  }],
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pet: {
    name: { type: String, required: true },
    feedingSchedule: { type: feedingScheduleSchema, required: true },
  },
});


userSchema.methods.encryptClave = async(clave) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(clave, salt);
  }
  
module.exports = mongoose.model("User", userSchema);