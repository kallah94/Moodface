package com.mycompany.myapp.domain.myclass;

import java.io.Serializable;
import java.util.List;

public class MoodBoard implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private String currentday;
    private List<Long> listmood;
    private List<String> listcomment;

    public MoodBoard(String currentday, List<Long> listmood, List<String> listcomment){
        this.currentday = currentday;
        this.listmood = listmood;
        this.listcomment = listcomment;
    }

    public void setcurrentday(String currentday){
        this.currentday = currentday;
    }

    public String getcurrentday(){
        return this.currentday;
    }

    public void setlistmood(List<Long> listmood){
        this.listmood = listmood;
    }

    public List<Long> getlistmood(){
        return this.listmood;
    }

    public List<String> getlistcomment(){
        return this.listcomment;
    }

    public void setlistcomment(List<String> listcomment){
        this.listcomment = listcomment;
    }
}