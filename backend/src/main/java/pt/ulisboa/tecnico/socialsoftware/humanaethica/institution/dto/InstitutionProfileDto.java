package pt.ulisboa.tecnico.socialsoftware.humanaethica.institution.dto;

import pt.ulisboa.tecnico.socialsoftware.humanaethica.assessment.dto.AssessmentDto;
import pt.ulisboa.tecnico.socialsoftware.humanaethica.enrollment.dto.EnrollmentDto;
import pt.ulisboa.tecnico.socialsoftware.humanaethica.institution.domain.Institution;
import pt.ulisboa.tecnico.socialsoftware.humanaethica.participation.dto.ParticipationDto;
import pt.ulisboa.tecnico.socialsoftware.humanaethica.utils.DateHandler;

import java.util.ArrayList;
import java.util.List;

public class InstitutionProfileDto {
    private Integer id;

    private String name;

    private String creationDate;

    private String nif;

    private String email;

    private List<EnrollmentDto> enrollments;

    private List<ParticipationDto> participations;

    private List<AssessmentDto> assessments;

    public InstitutionProfileDto(){
    }

    public InstitutionProfileDto(Institution institution){
        setId(institution.getId());
        setName(institution.getName());
        setCreationDate(DateHandler.toISOString(institution.getCreationDate()));
        setNIF(institution.getNIF());
        setEmail(institution.getEmail());

        List<EnrollmentDto> enrollments = new ArrayList<EnrollmentDto>();
        List<ParticipationDto> participations = new ArrayList<ParticipationDto>();

        institution.getActivities().forEach((activity) -> {
            activity.getEnrollments().forEach((enrollment) -> {
                enrollments.add(new EnrollmentDto(enrollment));
            });
            activity.getParticipations().forEach((participation) -> {
                participations.add(new ParticipationDto(participation));
            });
        });

        setEnrollments(enrollments);
        setParticipations(participations);

        List<AssessmentDto> assessments = new ArrayList<>();
        institution.getAssessments().forEach((assessment) -> {
            assessments.add(new AssessmentDto(assessment));
        });
        setAssessments(assessments);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public List<EnrollmentDto> getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(List<EnrollmentDto> enrollments) {
        this.enrollments = enrollments;
    }

    public List<ParticipationDto> getParticipations() {
        return participations;
    }

    public void setParticipations(List<ParticipationDto> participations) {
        this.participations = participations;
    }

    public List<AssessmentDto> getAssessments() {
        return assessments;
    }

    public void setAssessments(List<AssessmentDto> assessments) {
        this.assessments = assessments;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNIF() {
        return nif;
    }

    public void setNIF(String nif) {
        this.nif = nif;
    }
}
