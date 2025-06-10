const validateMenteeRequest = (req, res) => {
    const { scholar_no, role } = req.query;
  
    if (!scholar_no) {
      res.status(400).json({ message: "Missing required parameter: scholar_no" });
      return null;
    }
  
    if (role !== "mentee") {
      res.status(403).json({ message: "Forbidden: Only 'mentee' role is allowed" });
      return null;
    }
  
    return { scholar_no, role };
  };
  
  const validateMentorRequest = (req, res) => {
    const { scholar_no, role } = req.query;
  
    if (!scholar_no) {
      res.status(400).json({ message: "Missing required parameter: scholar_no" });
      return null;
    }
  
    if (role !== "mentor") {
      res.status(403).json({ message: "Forbidden: Only 'mentor' role is allowed" });
      return null;
    }
  
    return { scholar_no, role };
  };
  
  const validateMentorCoordinatorRequest = (req, res) => {
    const { scholar_no, role } = req.query;
  
    if (!scholar_no) {
      res.status(400).json({ message: "Missing required parameter: scholar_no" });
      return null;
    }
  
    if (role !== "mentorCoordinator") {
      res.status(403).json({ message: "Forbidden: Only 'mentorCoordinator' role is allowed" });
      return null;
    }
  
    return { scholar_no, role };
  };
  
  const validateAdminRequest = (req, res) => {
    const { scholar_no, role } = req.query;
  
    if (!scholar_no) {
      res.status(400).json({ message: "Missing required parameter: scholar_no" });
      return null;
    }
  
    if (role !== "admin") {
      res.status(403).json({ message: "Forbidden: Only 'admin' role is allowed" });
      return null;
    }
  
    return { scholar_no, role };
  };
  
  module.exports = {
    validateMenteeRequest,
    validateMentorRequest,
    validateMentorCoordinatorRequest,
    validateAdminRequest,
  };
  